/* eslint-disable prettier/prettier */
import { useMemo } from 'react';

type IContactItemProps = {
    type?: 'TEXT' | 'PHONE' | 'EMAIL' | 'HTML';
    icon: JSX.Element;
    content: string;
};

export const ContactItem: React.FC<IContactItemProps> = ({
    type = 'TEXT',
    icon,
    content,
}) => {
    const renderContent = useMemo(() => {
        switch (type) {
            case 'TEXT':
                return <span>{content || 'N/A'}</span>;
            case 'PHONE':
                return <a href={`tel:${content}`}>{content || 'N/A'}</a>;
            case 'EMAIL':
                return <a href={`mailto:${content}`}>{content || 'N/A'}</a>;
            default:
                return <span>{content || 'N/A'}</span>;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);

    return (
        <div className="flex space-x-2">
            <span className="flex items-center justify-center w-6 h-6 text-gray-400 rounded-full shadow-inner bg-gray-50">
                {icon}
            </span>
            <div className="flex-1" style={{ marginTop: 1.2 }}>
                {renderContent}
            </div>
        </div>
    );
};
