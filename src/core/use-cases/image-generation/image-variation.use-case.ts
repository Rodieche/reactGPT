import { ImageInterface } from "../../../interfaces";

type GeneratedImage = ImageInterface | null;

export const imageVariationtUseCase = async ( originalImage: string ): Promise<GeneratedImage> => {

    const endpoint = 'image-variation';

    try{
        const response = await fetch(`${ import.meta.env.VITE_GPT_API }/${ endpoint }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                baseImage: originalImage
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