import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-wrap gap-4 w-full justify-center md:justify-start">
        <div className="p-8 min-w-80">
          <div className="border border-neutral-700 shadow rounded-md p-12 max-w-sm w-full mx-auto bg-neutral-800">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-neutral-600 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-neutral-600 rounded"></div>
                </div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-neutral-600 rounded"></div>
                  <div className="h-4 bg-neutral-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 min-w-80">
          <div className="border border-neutral-700 shadow rounded-md p-12 max-w-sm w-full mx-auto bg-neutral-800">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-neutral-600 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-neutral-600 rounded"></div>
                </div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-neutral-600 rounded"></div>
                  <div className="h-4 bg-neutral-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 min-w-80">
          <div className="border border-neutral-700 shadow rounded-md p-12 max-w-sm w-full mx-auto bg-neutral-800">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-neutral-600 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                    <div className="h-2 bg-neutral-600 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-neutral-600 rounded"></div>
                </div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-neutral-600 rounded"></div>
                  <div className="h-4 bg-neutral-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner;
