export class Runtime {
    public static instance: Runtime;
    private readonly url: string = 'http://localhost:3002/api/v1/public';

    private constructor(
        public readonly projectId: string,
        baseUrl: string | undefined,
    ) {
        if (!baseUrl) return;

        this.url = `${baseUrl}/api/v1/public`;
    }

    static init(projectId: string, baseUrl: string | undefined) {
        Runtime.instance = new Runtime(projectId, baseUrl);
    }

    baseUrl(): string {
        return `${this.url}/${Runtime.instance.projectId}`;
    }
}
