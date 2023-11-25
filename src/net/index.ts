async function get<T>(url: string) {
  return await fetch(url, { method: 'GET' })
    .then((res: Response) => res.json())
    .then((data: T) => data)
}

export { get }
