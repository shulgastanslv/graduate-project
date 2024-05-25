import Image from "next/image";

interface UserBannerProps {
    imageUrl: string;
    username?: string;
};

export const UserBanner = ({
    imageUrl,
    username
}: UserBannerProps) => {

    return (
        <div>
            {imageUrl ? (
                    <div className="relative h-40 w-full">
                        <Image
                            src={imageUrl}
                            alt="banner"
                            objectFit="cover"
                            layout="fill"
                            className="shadow-sm"
                        />
                    </div>
            ) : (
                <div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 text-white flex items-center justify-center h-40 shadow-md">
                </div>
            )}
        </div>
    );
};