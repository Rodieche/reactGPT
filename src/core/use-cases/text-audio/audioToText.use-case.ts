import { AudioToTextResponse } from '../../../interfaces/audioToText.interface';

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {

    const endpoint = 'audio-to-text';

    try{
        const formData = new FormData();
        formData.append('file', audioFile);
        if(prompt){
            formData.append('prompt', prompt);
        }
        const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/${ endpoint }`, {
            method: 'POST',
            body: formData
        });

        const data = await resp.json() as AudioToTextResponse;
        return data;
        
    }catch(e){
        console.log(e);
        return null;
    }

}