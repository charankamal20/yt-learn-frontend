import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"

const Page = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 w-full h-full">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        {/* <video
          className="w-full h-full object-cover"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          controls
        /> */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/bZH9U1efx1c?si=ZwNMwe58DV05pfok?controls=1"
          className="w-full h-full object-cover"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="bg-background border-l rounded-lg overflow-hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-background hover:bg-muted"
            >
              <MenuIcon className="w-5 h-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full md:w-[300px] h-full">
            <div className="flex flex-col h-full">
              <div className="border-b p-4">
                <h2 className="text-xl font-semibold">Video Series</h2>
              </div>
              <div className="flex-1 overflow-auto">
                <nav className="grid gap-2 p-4">
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md bg-muted px-3 py-2 text-primary transition-colors hover:bg-muted/50"
                    prefetch={false}
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src="/placeholder.svg"
                        width={48}
                        height={48}
                        alt="Thumbnail"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium line-clamp-1">
                        Introduction to React
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        1. Getting Started
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md bg-muted px-3 py-2 text-primary transition-colors hover:bg-muted/50"
                    prefetch={false}
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src="/placeholder.svg"
                        width={48}
                        height={48}
                        alt="Thumbnail"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium line-clamp-1">
                        React Components
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        2. Building Components
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md bg-muted px-3 py-2 text-primary transition-colors hover:bg-muted/50"
                    prefetch={false}
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src="/placeholder.svg"
                        width={48}
                        height={48}
                        alt="Thumbnail"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium line-clamp-1">
                        React State Management
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        3. Managing State
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md bg-muted px-3 py-2 text-primary transition-colors hover:bg-muted/50"
                    prefetch={false}
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src="/placeholder.svg"
                        width={48}
                        height={48}
                        alt="Thumbnail"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium line-clamp-1">
                        React Routing
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        4. Routing in React
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md bg-muted px-3 py-2 text-primary transition-colors hover:bg-muted/50"
                    prefetch={false}
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src="/placeholder.svg"
                        width={48}
                        height={48}
                        alt="Thumbnail"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium line-clamp-1">
                        React Hooks
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        5. Using Hooks
                      </div>
                    </div>
                  </Link>
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center justify-between border-t p-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-muted"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-muted"
          >
            <ArrowRightIcon className="w-5 h-5" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}


function ArrowRightIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}


function MenuIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function XIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export default Page