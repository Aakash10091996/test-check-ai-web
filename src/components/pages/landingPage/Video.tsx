import { cn } from "@/lib/utils";

interface VideoProps {
  src: string;
  poster: string;
}

const Video: React.FC<VideoProps> = ({ src, poster }) => {
  return (
    <div
      className={cn(
        "lg:h-[calc(100%-40px)] max-lg:h-96 max-md:h-80 max-sm:h-64 max-xsm:max-h-56",
        " max-lg:min-w-[calc(100vw-100px)] lg:m-6 xl:m-10 rounded-xl"
      )}
    >
      {/* <iframe
        src={src}
        key={src}
        style={{
          height: "inherit",
          width: "100%",
          borderRadius: "14px",
        }}
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
      ></iframe> */}
      <video
        src={src}
        key={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className="size-fit overflow-hidden rounded-xl max-lg:size-full"
      />
    </div>
  );
};

export default Video;
