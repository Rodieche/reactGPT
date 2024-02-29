import { ImageInterface } from "../../interfaces";

type GeneratedImage = ImageInterface | null;

export const imageGenerationtUseCase = async ( prompt: string, originalImage?: string, maskImage?: string ): Promise<GeneratedImage> => {

    const endpoint = 'image-generation';

    try{
        const response = await fetch(`${ import.meta.env.VITE_GPT_API }/${ endpoint }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                originalImage,
                maskImage
            })
        });

        const { url, revised_prompt: alt } = await response.json();
        return {
            url,
            alt
        }
        
    }catch(e){
        console.log(e);
        return null;
    }

}