declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_BASE_URL: string;
    }
  }
  
  declare const process: {
    env: NodeJS.ProcessEnv;
  };
  