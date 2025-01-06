import Image from "next/image";

interface ChatRoom {
  id: string;
  title: string;
  image_file: string | null;
  created_at: string;
}

interface ChatListProps {
  chatrooms: ChatRoom[];
}

export default function ChatList({ chatrooms }: ChatListProps) {
  return (
    <div className="max-w-[1200px] mx-auto py-10 bg-white text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {chatrooms.map((room) => (
          <a
            key={room.id}
            href={`/chat/${room.id}`}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition bg-white"
          >
            {room.image_file && (
              <Image
                src={room.image_file}
                alt={room.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{room.title}</h2>
              <p className="text-sm text-gray-500">
                생성일: {new Date(room.created_at).toLocaleDateString()}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}