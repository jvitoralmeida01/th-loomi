export default function ReverseBorderRadius({ className }: { className?: string }) {
  return (
    <svg className={`h-12 w-12 fill-background ${className}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 0 0
          L 100 0
          L 100 100
          Q 100 0 0 0
          Z"
        stroke="none"
      />
    </svg>
  )
}




