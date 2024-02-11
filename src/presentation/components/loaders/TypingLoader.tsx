import './TypingLoader.css';

interface Props {
  className?: string;
}

export const TypingLoader = ({ className }: Props) => {
  return (
    <div className={`typing ${ className }`}>
        <div className="circle scaling"></div>
        <div className="circle scaling"></div>
        <div className="circle scaling"></div>
    </div>
  )
}
