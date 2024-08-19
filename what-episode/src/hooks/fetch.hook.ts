import { useEffect, useState } from "react"

export function useFetch<T>(
  url: string,
  options: RequestInit = {},
): [T | null, boolean] {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void fetch(url, options)
      .then(response => response.json())
      .then((data: T) => {
        setData(data)
        setLoading(false)
      })
      .catch((error: unknown) => {
        console.warn(error)
        setData(null)
      })
  }, [url, options])

  return [data, loading]
}
