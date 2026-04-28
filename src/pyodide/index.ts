declare global {
  interface Window {
    loadPyodide: any;
  }
}

class PyodideManager {
  private pyodide: any = null;
  private initialized: boolean = false;
  private resolveInit: (() => void) | null = null;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // 动态加载Pyodide脚本
      if (!window.loadPyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.async = true;
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      this.pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });
      // 预加载必要包
      await this.pyodide.loadPackage(['pandas', 'numpy', 'matplotlib', 'scikit-learn']);
      // 配置 matplotlib 以生成图片
      this.pyodide.runPython(`
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as plt
      `);
      this.initialized = true;
      if (this.resolveInit) {
        this.resolveInit();
        this.resolveInit = null;
      }
    } catch (error) {
      console.error('Pyodide 初始化失败:', error);
    }
  }

  async waitForInit(): Promise<void> {
    if (this.initialized) {
      return;
    }
    return new Promise((resolve) => {
      this.resolveInit = resolve;
    });
  }

  async runCode(code: string, dataFiles: Array<{ name: string; content: string }> = []): Promise<{ stdout: string; imageData: string | null }> {
    await this.waitForInit();
    
    if (!this.pyodide) {
      throw new Error('Pyodide 未初始化');
    }

    // 将 CSV 文件挂载到虚拟文件系统
    for (const file of dataFiles) {
      this.pyodide.FS.writeFile(file.name, file.content);
    }

    try {
      // 捕获标准输出
      let stdout = '';
      this.pyodide.setStdout({ batched: (msg: string) => { stdout += msg + '\n'; } });
      
      // 添加超时处理，避免代码执行时间过长
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('代码执行超时，请检查代码是否有无限循环或其他问题')), 30000); // 30秒超时
      });
      
      // 并行执行代码和超时检查
      await Promise.race([
        this.pyodide.runPythonAsync(code),
        timeoutPromise
      ]);
      
      // 检查是否有图表生成
      const hasFigure = this.pyodide.runPython('len(plt.get_fignums()) > 0');
      let imageData = null;
      if (hasFigure) {
        // 将图表转换为 Base64 编码
        this.pyodide.runPython(`
          import base64
          from io import BytesIO
          buffer = BytesIO()
          plt.savefig(buffer, format='png')
          buffer.seek(0)
          image_data = base64.b64encode(buffer.read()).decode('utf-8')
          plt.close('all')
        `);
        imageData = this.pyodide.globals.get('image_data');
      }
      return { stdout, imageData };
    } catch (error: any) {
      throw new Error(error.message || '代码执行失败');
    }
  }
}

// 导出单例实例
export const pyodideManager = new PyodideManager();