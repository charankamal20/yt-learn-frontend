"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YouTubePlayer from "@/components/VideoPlayer";
import { Link2, TvMinimalPlay } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Error from "@/components/shared/Error";

const CoursePage = () => {
  const [open, setOpen] = useState(false);
  const [playlistLink, setPlaylistLink] = useState("");
  const [url, setUrl] = useState<string | undefined>();
  const [listID, setListID] = useState<string>();
  const [error, setError] = useState<string | undefined>();

  const isValidUrl = (url: string) => {
    setError(undefined);
    try {
      const _url = new URL(url);
      if (_url.origin !== "https://www.youtube.com") {
        console.log("NOT YOUTUBE", url);
        setError((error) => "Please Enter a Youtube URL!");
        return false;
      }

      setError((error) => undefined);

      if (
        _url.searchParams.get("list") === null ||
        _url.searchParams.get("list") === ""
      ) {
        console.log("list not fount");
        setError((error) => "Please Enter a Valid Playlist URL!");
        return false;
      }

      setError((error) => undefined);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getVideoList = () => {};

  const createEmbedLink = () => {
    if (playlistLink === "" || playlistLink == undefined) {
      return;
    }

    // Create a URL object
    const urlObj = new URL(playlistLink);

    // Use URLSearchParams to extract parameters
    const params = new URLSearchParams(urlObj.search);

    let newEmbedLink: string = "https://www.youtube.com/embed/videoseries?";

    const siValue = params.get("si");
    if (siValue !== null && siValue !== undefined) {
      newEmbedLink = newEmbedLink + "si=" + siValue + "&";
    }

    const listValue = params.get("list");
    if (listValue !== null) {
      setListID(listValue);
      newEmbedLink = newEmbedLink + "list=" + listValue;
    }

    if (!isValidUrl(newEmbedLink)) {
      return;
    }

    //! Save this playlist to users playlists
    console.log(newEmbedLink);
    setUrl(newEmbedLink);
    return;
  };

  useEffect(() => {
    setTimeout(() => {
      if (open === false) {
        setOpen(true);
      }
    }, 2000);
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Paste Youtube Playlist Link Below</DialogTitle>
            <DialogDescription>
              Copy the link for youtube playlist you want to watch and paste it
              below.
            </DialogDescription>
          </DialogHeader>
          <form
            onClick={(e) => {
              e.preventDefault();
              if (!isValidUrl(playlistLink)) {
                setError("Please enter a valid Youtube URL.");
                return;
              } else {
                setError(undefined);
              }
              setOpen(false);
              createEmbedLink();
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Link2 />
                <Input
                  id="link"
                  value={playlistLink}
                  onChange={(e) => {
                    if (!isValidUrl(e.target.value)) {
                      setError("Please enter a valid Youtube URL.");
                    } else {
                      setError(undefined);
                    }
                    setPlaylistLink(e.target.value);
                  }}
                  placeholder="Paste Link Here"
                  type="url"
                  className="col-span-4"
                />
              </div>
              {error && <Error message={error} />}
            </div>
            <DialogFooter>
              <Button type="submit">Import Playlist</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="p-2 gap-2 w-full h-full grid grid-cols-[1fr_300px] grid-rows-[40px_1fr_52px]">
        <div className="bg-white col-start-2 row-start-1 row-span-2 pb-14 h-full">
          {/* <Tabs defaultValue="resources" className="w-[300px] h-full ">
            <TabsList className="my-1 grid grid-cols-2 w-full">
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent
              className="ring-1 ring-gray-300 rounded-xl h-full flex justify-center items-center text-gray-400"
              value="videos"
            >
              No new resources yet.
            </TabsContent>
            <TabsContent
              className="ring-1 ring-gray-300 rounded-xl h-full flex justify-center items-center text-gray-400"
              value="resources"
            >
              No new resources yet.
            </TabsContent>
          </Tabs> */}
          <Tabs defaultValue="account" className="h-full w-[300px]">
            <TabsList className="grid my-1 grid-cols-2">
              <TabsTrigger value="account">Resources</TabsTrigger>
              <TabsTrigger value="password">Videos</TabsTrigger>
            </TabsList>
            <TabsContent className="px-0.5 h-full" value="account">
              <div className="ring-1 ring-gray-300 rounded-lg h-full flex justify-center items-center text-gray-400">
                Make changes to your account here.
              </div>
            </TabsContent>
            <TabsContent className="px-0.5 h-full" value="password">
              <div className=" ring-1 ring-gray-300 rounded-lg h-full flex justify-center items-center text-gray-400">
                Change your password here.
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="relative aspect-video rounded-lg row-span-2 col-start-1 col-span-1 row-start-2">
          {!url && (
            <div
              onClick={() => {
                setOpen(true);
              }}
              className="cursor-pointer w-full h-full  flex items-center justify-center rounded-lg border border-black border-dashed animate-pulse bg-slate-100 text-sm"
            >
              <div className="space-y-2">
                <TvMinimalPlay className="size-8 mx-auto " />
                <hr className="mx-4" />
                <h2 className="font-bold text-xl">
                  Click here to enter a new Youtube Playlist
                </h2>
              </div>
            </div>
          )}
          {listID && (
            // <iframe
            //   className="w-full h-full object-cover"
            //   src={url}
            //   title="Playlist"
            //   allow="accelerometer; clipboard-write; encrypted-media; gyroscope; web-share"
            //   referrerPolicy="strict-origin-when-cross-origin"
            //   allowFullScreen
            // ></iframe>
            <YouTubePlayer playlist_url={listID} />
          )}
        </div>
      </div>
    </>
  );
};

export default CoursePage;
