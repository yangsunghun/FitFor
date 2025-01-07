import Image from "next/image";

interface ChatRoom {
  id: string;
  title: string;
  image_url: string | null;
  created_at: string;
  room_leader: string;
}

interface ChatListProps {
  chatrooms: ChatRoom[];
}

export default function ChatList({ chatrooms }: ChatListProps) {
  return (
    <div className="mx-auto max-w-[1200px] bg-white py-10 text-black">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {chatrooms.map((room) => (
          <a
            key={room.id}
            href={`/chat/${room.id}`}
            className="overflow-hidden rounded-lg border bg-white shadow-md transition hover:shadow-lg"
          >
            {room.image_url && (
              <Image
                src={room.image_url}
                alt={room.title}
                width={400}
                height={250}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{room.title}</h2>
              <p className="text-sm text-gray-500">생성일: {new Date(room.created_at).toLocaleDateString()}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}