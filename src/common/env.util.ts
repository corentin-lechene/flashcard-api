export enum EnvType {
    production = "production",
    development = "development",
    stage = "stage",
}

export class EnvUtil {
    public static onDev() {
        return EnvUtil.getEnv() === EnvType.development;
    }

    public static onProd() {
        return EnvUtil.getEnv() === EnvType.production;
    }

    public static onStage() {
        return EnvUtil.getEnv() === EnvType.stage;
    }

    public static getEnv(): EnvType {
        const node_env = process.env!.NODE_ENV;
        if(!node_env || !node_env.trim()) {
            console.error('NODE_ENV empty');
            process.exit();
        }
        return node_env.trim().toLowerCase() as EnvType;
    }
}