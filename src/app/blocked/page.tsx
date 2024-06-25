import Link from "next/link";

export default function Component() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-800">
      <div className="flex max-w-md flex-col space-y-4 rounded-md bg-white p-6 align-middle shadow-md dark:bg-gray-950">
        <div className="flex items-start">
          <CircleAlertIcon className="text-red-500 mr-4 size-6" />
          <div>
            <h2 className="text-lg font-semibold">Access Restricted</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Too many Request, Please try again.
            </p>
          </div>
        </div>
        <Link
          href="/"
          replace={true}
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CircleAlertIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
