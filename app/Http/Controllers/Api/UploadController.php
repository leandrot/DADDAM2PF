<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        // Validar que venga un archivo imagen
        $data = $request->validate([
            'file' => 'required|image|max:2048',
        ]);

        $file = $data['file'];

        // Carpeta relativa dentro de `public_html`
        $folder = 'images/ingredients';

        // Ruta absoluta a `public_html`
        // Ajusta la ruta según tu estructura real:
        // __DIR__ es app/Http/Controllers, subimos 3 niveles hasta la raíz del proyecto
        // y luego vamos a ../public_html
        $publicHtmlPath = realpath(__DIR__ . '/../../../public_html');

        if ($publicHtmlPath === false) {
            return response()->json([
                'message' => 'No se encontró la carpeta public_html en el servidor',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $destinationPath = $publicHtmlPath . DIRECTORY_SEPARATOR . $folder;

        // Asegurarse de que la carpeta exista
        if (! is_dir($destinationPath)) {
            mkdir($destinationPath, 0755, true);
        }

        // Nombre único
        $filename = Str::uuid()->toString() . '.' . $file->getClientOriginalExtension();

        // Mover el archivo a `public_html/images/ingredients`
        $file->move($destinationPath, $filename);

        // Ruta relativa que guardarás en BD (ej: `images/ingredients/xxx.jpg`)
        $relativePath = $folder . '/' . $filename;

        return response()->json([
            'path' => $relativePath,
            // URL pública completa apuntando a public_html (tu dominio ya apunta ahí)
            'url'  => url($relativePath),
        ], Response::HTTP_CREATED);
    }
}
