import { ReactNode } from "react";

interface CardProps {
    children: ReactNode
}

const Card = ({children}:CardProps) => {
    return (
        <div className="dark:bg-gray-800 p-6 rounded">
            {children}
        </div>
    )
}

export default Card;