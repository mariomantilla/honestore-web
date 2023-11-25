interface SeriaalizedError {
    name: string,
    message: string,
    stack: string,
}

export default class ErrorTracker {

    DATASOURCE = 'error_events';

    proxy: string | null
    token: string | null
    host: string | null
    domain: string | null

    constructor({
        proxy, token, host, domain
    }: {
        proxy?: string | null,
        token?: string | null,
        host?: string | null,
        domain?: string | null
    }) {
        this.proxy = proxy || null;
        this.token = token || null;
        this.host = host || null;
        this.domain = domain || null;
    }

    serializeError(error: any): SeriaalizedError {
        if (error instanceof Error) {
            // Extract basic properties of the error object
            const { name, message, stack } = error;
    
            // Create a plain object to hold the serialized error information
            const serializedError = {
                name,
                message,
                stack: stack || "",
            };
            return serializedError;
        } else {
            // If the error is not an instance of Error, stringify it directly
            return {
                name: "Unkown error class",
                message: JSON.parse(JSON.stringify(error)),
                stack: ""
            }
        }
    }

    // Function to handle unhandled promise rejections
    handlePromiseRejection(event: PromiseRejectionEvent) {
        try {
            // Extract relevant information from the event
            const { reason } = event;
            // Serialize the error object
            const serializedError = this.serializeError(reason);        // Send the serialized error info to your error tracking system
            this.sendToErrorTrackingSystem(serializedError);
        } catch (error) {
            console.log(error);
        }
        
    }

    handleErrorEvent(event: string | Event, source: string | undefined, lineno: number | undefined, colno: number | undefined, error: any | undefined) {
        try {
            const serializedError = this.serializeError(error);
            // Send the serialized error info to your error tracking system
            this.sendToErrorTrackingSystem(serializedError);
        } catch (error) {
            console.log(error);
        }
    }

    // Function to send the error information to the error tracking system
    sendToErrorTrackingSystem(serializedError: SeriaalizedError) {
        // Combine relevant information
        const errorInfo = {
            timestamp: new Date().toISOString(),
            href: window.location.href,
            ...serializedError,
            version: '1',
            userAgent: window.navigator.userAgent
        };

        let url;

        // Use public Tinybird url if no custom endpoint is provided
        if (this.proxy) {
            url = `${this.proxy}/api/tracking`;
        } else if (this.host) {
            let host = this.host.replaceAll(/\/+$/gm, '');
            url = `${host}/v0/events?name=${this.DATASOURCE}`
        } else {
            url = `https://api.tinybird.co/v0/events?name=${this.DATASOURCE}`
        }
        
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+this.token
            },
            body: JSON.stringify(errorInfo),
        }).catch((e) => {console.log(e)})
    }

    addHandlers() {
        if (typeof window === "undefined") return;
        if (process.env.NEXT_PUBLIC_BASE_URL?.includes('localhost')) {
            console.log('Debug environment: disabled error tracking system');
            // return
        }
        window.onerror = (...params) => this.handleErrorEvent(...params);
        window.onunhandledrejection = (...params) => this.handlePromiseRejection(...params);
    }

}