import { Blog } from "@/types";

function Card({blog} : {blog : Blog}) {
    return (
        <div className="max-full overflow-hidden rounded shadow-lg">
            <img
                className="h-40 w-full object-cover"
                src="https://images.unsplash.com/photo-1572048572872-2394404cf1f3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
                <div className="mb-2 text-xl font-bold">{blog.title}</div>
                <p className="text-base text-gray-700">
                    {blog.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    #photography
                </span>
                <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    #travel
                </span>
                <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    #winter
                </span>
            </div>
        </div>
    );
}

export default Card;
