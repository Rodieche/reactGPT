import { useEffect, useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { createThreadUseCase, postQuestionUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const AssistantPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [greet, setGreet] = useState('');

  const [threadId, setThreadId] = useState<string>();

  useEffect(() => {
    const hora = new Date().getHours();
    
    if(hora >= 0 && hora < 6) setGreet('Buenas noches');
    if(hora >= 6 && hora < 12) setGreet('Buenos dias');
    if(hora >= 12 && hora < 18) setGreet('Buenas tardes');
    if(hora >= 18 && hora <= 23) setGreet('Buenas noches');
  }, []);

  useEffect(() => {
    const threadId = localStorage.getItem('threadId');
    if(threadId){
      setThreadId(threadId);
    }else{
      createThreadUseCase()
      .then( (id) => {
        setThreadId(id);
        localStorage.setItem('threadId',id)
      });
    }
  },[]);

  useEffect(() => {
    if(threadId){
      setMessages((prev) => [...prev, { text: `Numero de Thread: ${ threadId }`, isGpt: true }]);
    }
  },[threadId]);

  const handlePost = async( text:string ) => {

    if( !threadId ) return;
    setIsLoading(true);
    setMessages( (prev) => [ ...prev, { text, isGpt: false } ] );

    const replies = await postQuestionUseCase(threadId, text);

    setIsLoading(false);

    // for (const reply of replies) {
    //   for (const message of reply.content) {
    //     setMessages((prev) => [...prev, {
    //       text: message,
    //       isGpt: (reply.role === 'assistant'),
    //     }])
    //   }
    // }

    console.log(replies[replies.length - 1].content);

    const msg = replies[replies.length - 1].content[0];
    setMessages((prev) => [...prev, {
      text: msg,
      isGpt: true
    }])

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text={`${greet}, soy Sam, ¿En que puedo ayudarte?`} />

          {
            messages.map((message, index) => (
              message.isGpt
              ? (
                <GptMessage key={index} text={ message.text } />
              )
              : (
                <MyMessage key={index} text={ message.text } />
              )
            ))
          }

          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }



        </div>
      </div>

        <TextMessageBox
          onSendMessage={ handlePost }
          placeholder="Escribe aqui lo que deseas"
          disableCorrections 
        
        />
    
    </div>
  )
}
