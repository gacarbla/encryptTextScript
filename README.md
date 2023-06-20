<h1 align="center">SCRIPT DE ENCRIPTACIÓN DE TEXTO</h1>

En este repositorio encontrarás dos carpetas, la carpeta `javascript` y la carpeta `typescript`, en cada una de ellas encontrarás un archivo que incluye una función `encrypt` con los siguientes parámetros:

| Nombre | Tipo | Descripción | Requisitos | Opciones |
| --- | :---: | --- | :---: | --- |
| `source` | Texto | Texto original que deseas encriptar. | Longitud>=1 |
| `key` | Texto | Contraseña o clave que quieras emplear pata encriptarlo. | Longitud>=1 |
| `char_displacement` | Número | Parámetro de encriptación, debe ser mayor que 0. | >0 |
| `input_type` | Texto  | Tipo de entrada.<br>( ascii \| binary \| base64 \| text ) | Está en la lista | ascii <br> binary <br> base64 <br> text |
| `output_type` | Texto | Tipo de salida.<br>( ascii \| binary \| base64 \| text ) | Está en la lista | ascii <br> binary <br> base64 <br> text |
| `action` | Texto  | Acción que la función debe llevar a cabo.<br>( encrypt \| decrypt ) | Está en la lista | encrypt <br>decrypt |