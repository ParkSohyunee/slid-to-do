import { cn } from "@/libs/utils/shadcn-ui"

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-100 dark:bg-slate-800",
        className,
      )}
      {...props}
    />
  )
}

export function WhiteBgSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white dark:bg-slate-800",
        className,
      )}
      {...props}
    />
  )
}

export function ItemSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export function CardItemSkeleton() {
  return (
    <div className="space-y-2">
      <WhiteBgSkeleton className="h-4 w-2/3" />
      <WhiteBgSkeleton className="h-3 w-1/2" />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

export function NoteSkeleton() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 rounded-[8px]" />
        <div className="flex justify-between">
          <Skeleton className="h-6 w-[250px] rounded-[8px]" />
          <Skeleton className="h-6 w-[100px] rounded-[8px]" />
        </div>
      </div>
      <div className="pt-3 pb-3 border-t border-b border-slate-200 flex items-center justify-between">
        <Skeleton className="h-8 w-[300px] rounded-[8px]" />
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-8 rounded-[8px]" />
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[100px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}
