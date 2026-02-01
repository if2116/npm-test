'use client';

import React from 'react';
import { Youtube, PlayCircle } from 'lucide-react';

interface DemoVideoEmbedProps {
  videoUrl?: string;
  thumbnail?: string;
  title?: string;
}

/**
 * Demo video embed component with placeholder support
 * - Shows placeholder when no videoUrl provided
 * - Embeds YouTube/Bilibili videos directly when URL provided
 */
export default function DemoVideoEmbed({
  videoUrl,
  thumbnail,
  title = 'Demo Video'
}: DemoVideoEmbedProps) {
  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  // Extract Bilibili video ID from URL
  const getBilibiliId = (url: string) => {
    const match = url.match(/bilibili\.com\/video\/(BV[\w]+|av[\d]+)/);
    return match ? match[1] : null;
  };

  // Placeholder when no video available
  if (!videoUrl) {
    return (
      <div className="w-full rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white p-12 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <PlayCircle className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Demo Video Coming Soon
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Interactive demo and video walkthrough will be available here.
        </p>
      </div>
    );
  }

  // YouTube embed
  const youtubeId = getYouTubeId(videoUrl);
  if (youtubeId) {
    return (
      <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  // Bilibili embed
  const bilibiliId = getBilibiliId(videoUrl);
  if (bilibiliId) {
    return (
      <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          width="100%"
          height="100%"
          src={`//player.bilibili.com/player.html?bvid=${bilibiliId}&page=1`}
          title={title}
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  // Generic video placeholder (unsupported platform)
  return (
    <div className="w-full rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-12 text-center">
      <Youtube className="h-12 w-12 text-blue-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Demo Video Available
      </h3>
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <PlayCircle className="h-5 w-5" />
        Watch Demo
      </a>
    </div>
  );
}
