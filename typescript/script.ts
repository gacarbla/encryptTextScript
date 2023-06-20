function encrypt(source: string, key: string, char_displacement: number, input_type: "ascii" | "binary" | "base64" | "text", output_type: "ascii" | "binary" | "base64" | "text", action: "encrypt" | "decrypt"): string {
  if (!key || key == "" || key == undefined || key == null) throw new Error("The specified key is invalid")
  if (!input_type || (input_type != "ascii" && input_type != "binary" && input_type != "base64" && input_type != "text")) throw new Error("The input_type entered is not valid")
  if (!output_type || (output_type != "ascii" && output_type != "binary" && output_type != "base64" && output_type != "text")) throw new Error("The output_type entered is not valid")
  if (!action || (action != "encrypt" && action != "decrypt")) throw new Error("The action entered is not valid")
  if (!char_displacement || char_displacement < 0 || char_displacement > 1024) throw new Error("The char_displacement entered is not valid")
  if (!source) throw new Error("You need to define a source text")

  let input_to_base: number[] = []

  switch (input_type) {
    case "ascii":
      source.trim().split(/ +/g).forEach((letter) => { input_to_base.push(parseInt(letter)) })
      break
    case "base64":
      input_to_base = base64_dec(source)
      break
    case "binary":
      source.trim().split(/ +/g).forEach((letter) => { input_to_base.push(bin_dec(parseInt(letter))) })
      break
    case "text":
      input_to_base = text_dec(source)
      break
  }

  let transformed: number[] = []

  let n = 0
  switch (action) {
    case "decrypt":
      for (let i = 0; i < input_to_base.length; i++) {
        if (n >= key.length) n = 0
        transformed.push(Math.floor((input_to_base[i] / (key.length - n)) - key.charCodeAt(n) - char_displacement))
      }
      break
    case "encrypt":
      for (let i = 0; i < input_to_base.length; i++) {
        if (n >= key.length) n = 0
        transformed.push(Math.floor((input_to_base[i] + key.charCodeAt(n) + char_displacement) * (key.length - n)))
      }
      break
  }

  let text: string
  let text_array: string[] = []

  switch (output_type) {
    case "ascii":
      text = transformed.join(" ")
      break
    case "base64":
      text = dec_base64(transformed)
      break
    case "binary":
      transformed.forEach((letter) => { text_array.push(`${dec_bin(letter)}`) })
      text = text_array.join(" ")
      break
    case "text":
      transformed.forEach((letter) => { text_array.push(dec_letter(letter)) })
      text = text_array.join("")
  }

  return text
}

function text_dec(text: string): number[] {
  let dec_array: number[] = []
  text.trim().split("").forEach((letter) => { dec_array.push(letter.charCodeAt(0)) })
  return dec_array;
}

function dec_bin(number: number): number {
  return parseInt((number >>> 0).toString(2));
}

function dec_letter(letter: number): string {
  return String.fromCharCode(letter)
}

function bin_dec(number: number): number {
  return parseInt(`${number}`, 2)
}

function base64_dec(text: string): number[] {
  let dec_array: number[] = []
  text_dec(atob(text)).forEach((letter) => { dec_array.push(letter) })
  return dec_array;
}

function dec_base64(text: number[]): string {
  let text_array: string[] = []
  text.forEach((letter) => { text_array.push(dec_letter(letter)) })
  return btoa(text_array.join(""))
}