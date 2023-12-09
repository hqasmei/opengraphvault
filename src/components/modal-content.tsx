'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { findOgImageById } from '@/lib/utils';
import download from 'downloadjs';
import { Check, Download, ExternalLink, Share } from 'lucide-react';

export default function ModalContent({ id }: { id: string }) {
  const ogImageData = findOgImageById(id);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const response = await fetch(ogImageData?.metadata.og_image || '');
      const blob = await response.blob();

      // Use downloadjs to trigger the download
      download(blob, 'image.jpg', 'image/jpeg');
    } catch (error) {
      console.error(error);
      // Handle error, show a message to the user, etc.
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    try {
      // Copy the URL to the clipboard
      await navigator.clipboard.writeText(ogImageData?.metadata.url || '');

      // Update state to indicate that the URL has been copied
      setIsUrlCopied(true);

      // Reset the state after a brief period (e.g., 3 seconds)
      setTimeout(() => {
        setIsUrlCopied(false);
      }, 3000);
    } catch (error) {
      console.error('Error copying URL to clipboard:', error);
      // Handle error, show a message to the user, etc.
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 flex-col p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <img
            className="w-full h-full object-cover   object-top rounded-md cursor-pointer shadow-sm"
            src={ogImageData?.metadata.og_image}
            alt={ogImageData?.metadata.og_title}
            loading="lazy"
          />
          <div className="flex flex-row space-x-1">
            {ogImageData?.metadata.tags &&
              ogImageData?.metadata.tags.map((tag, idx) => {
                return (
                  <Badge key={idx} className="" variant="secondary">
                    {tag}
                  </Badge>
                );
              })}
          </div>
        </div>

        <div className="flex flex-col ">
          <span className="text-lg font-semibold">
            {ogImageData?.metadata.og_title}
          </span>
          <span className="text-sm font-thin">
            {ogImageData?.metadata.og_description}
          </span>
        </div>
      </div>

      {ogImageData?.metadata.url && (
        <div className="flex flex-row justify-start space-x-4">
          <Button
            size="sm"
            onClick={handleDownload}
            className="flex flex-row space-x-2"
          >
            <span>Download</span>
            <Download size={14} />
          </Button>
          <Button
            size="sm"
            onClick={handleShare}
            className="flex flex-row space-x-2"
          >
            {isUrlCopied ? (
              <>
                <span>Copied</span>
                <Check size={14} />
              </>
            ) : (
              <>
                <span>Share</span>
                <Share size={14} />
              </>
            )}
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link
              href={ogImageData?.metadata.url}
              target="_blank"
              className="flex flex-row space-x-2"
            >
              <span>Website</span>
              <ExternalLink size={14} />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
