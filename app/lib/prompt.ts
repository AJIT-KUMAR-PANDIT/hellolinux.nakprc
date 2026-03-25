export const processPrompt = async (prompt: string): Promise<string> => {
    // simulate API / AI processing
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Processed: ${prompt}`);
        }, 1000);
    });
};