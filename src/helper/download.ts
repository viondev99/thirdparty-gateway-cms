export const createDownloadFile = (blob: any, fileName: string) => {
  const newBlob = new Blob([blob], {
    type: 'application/zip',
    // responseType: 'arraybuffer'
  })
  const url = window.URL.createObjectURL(newBlob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  link.parentNode?.removeChild(link)
}
