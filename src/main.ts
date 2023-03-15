export {}

const bt_new = document.querySelector<HTMLButtonElement>("#new")!
const bt_load = document.querySelector<HTMLButtonElement>("#load")!
const bt_save = document.querySelector<HTMLButtonElement>("#save")!
const ta_text = document.querySelector<HTMLTextAreaElement>("#text")!

let fsfh: FileSystemFileHandle

bt_new.onclick = async () => {
  fsfh = await window.showSaveFilePicker({
    types: [{
      description: 'Text file',
      accept: {'text/plain': ['.txt']}, 
    }]
  })
  ta_text.value = ""
}
bt_load.onclick = async () => {
  fsfh = (await window.showOpenFilePicker())[0]
  ta_text.value = await (await fsfh.getFile()).text()
}
bt_save.onclick = async () => {
  if (!fsfh) {
    fsfh = await window.showSaveFilePicker({
      types: [{
        description: 'Text file',
        accept: {'text/plain': ['.txt']}, 
      }]
    })
  }
  const writer = await fsfh.createWritable()
  await writer.write(ta_text.value ?? "")
  await writer.close()
}