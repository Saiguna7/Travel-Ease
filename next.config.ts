import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
        serverExternalPackages: ['sharp'],
        images: {
                loader: 'default', 
              },
output:"standalone"
};

export default withNextVideo(nextConfig);