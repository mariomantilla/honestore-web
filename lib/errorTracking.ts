import { error } from "console";

export default class ErrorTracker {

    DATASOURCE: string = 'error_events';

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

    serializeError(error: any) {
        if (error instanceof Error) {
            // Extract basic properties of the error object
            const { name, message, stack } = error;
    
            // Create a plain object to hold the serialized error information
            const serializedError = {
                name,
                message,
                stack,
            };
            return serializedError;
        } else {
            // If the error is not an instance of Error, stringify it directly
            return JSON.parse(JSON.stringify(error));
        }
    }

    // Function to handle unhandled promise rejections
    handlePromiseRejection(event: PromiseRejectionEvent) {
        // Extract relevant information from the event
        const { reason } = event;
        // Serialize the error object
        const serializedError = this.serializeError(reason);        // Send the serialized error info to your error tracking system
        this.sendToErrorTrackingSystem(serializedError);
    }

    handleErrorEvent(event: string | Event, source: string | undefined, lineno: number | undefined, colno: number | undefined, error: any | undefined) {
        const serializedError = this.serializeError(error);
        // Send the serialized error info to your error tracking system
        this.sendToErrorTrackingSystem(serializedError);
    }

    // Function to send the error information to the error tracking system
    sendToErrorTrackingSystem(serializedError: object) {
        // Combine relevant information
        const errorInfo = {
            serializedError,
            href: window.location.href,
            version: '1',
            timestamp: new Date().toISOString(),
        };
        // Implement your logic to send the error information to your tracking system
        // For example, you can use XMLHttpRequest, fetch, or any other suitable method.
        // Make sure to handle the actual implementation based on your error tracking system.
        let url;

        // Use public Tinybird url if no custom endpoint is provided
        if (this.proxy) {
            url = `${this.proxy}/api/tracking`;
        } else if (this.host) {
            let host = this.host.replaceAll(/\/+$/gm, '');
            url = `${host}/v0/events?name=${this.DATASOURCE}&token=${this.token}`
        } else {
            url = `https://api.tinybird.co/v0/events?name=${this.DATASOURCE}&token=${this.token}`
        }
        
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(errorInfo),
        })
    }

    addHandlers() {
        if (typeof window === "undefined") return;
        if (process.env.NEXT_PUBLIC_BASE_URL?.includes('localhost')) {
            console.log('Debug environment: disabled error tracking system')
        }
        window.onerror = (...params) => this.handleErrorEvent(...params);
        window.onunhandledrejection = (...params) => this.handlePromiseRejection(...params);
    }

}