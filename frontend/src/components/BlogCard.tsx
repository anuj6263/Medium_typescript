import { Link, useNavigate } from "react-router-dom";

interface BlogCardProps {
    id : string,
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`} >
        <div className="m-5 p-6 w-screen max-w-screen-sm bg-gray-200 rounded-lg shadow-lg cursor-pointer">
            <div className="flex items-center">
                <Avatar name={authorName} size={8} />
                <div className="ml-4 text-xl font-semibold text-gray-700">{authorName}</div>
                <div className="ml-auto text-lg text-gray-500">{publishedDate}</div>
            </div>
            <div className="mt-4 text-xl font-bold text-gray-800">{title}</div>
            <div className="mt-4 text-lg text-gray-600">{content.slice(0, 100)}...</div>
            <div className="mt-4 text-lg text-gray-700">{`${Math.ceil(content.length / 100)} minute read`}</div>
            <div className="mt-6 bg-gray-400 h-px"></div>
        </div>
        </Link>
    );
};

interface AvatarProps {
    name: string;
    size?: number;
}

export function Avatar({ name, size = 6 }: AvatarProps) {
    const nagigate = useNavigate();

    const changeLoc = () => {
        nagigate("/signup");
    };

    return (
        <div onClick={changeLoc} className={`flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full text-lg text-gray-700 ${size}`}>
            <span>{name[0]}</span>
        </div>
    );
}
