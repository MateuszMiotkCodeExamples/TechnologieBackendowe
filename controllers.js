// controllers.js
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getAll, remove, get, save } from './model.js';
import { render } from './view.js';
import { render as form } from './form.js';

export async function listAction(request, response) {
    const data = await getAll();
    response.render(`${dirname(fileURLToPath(import.meta.url))}/views/list`);
}

export async function removeAction(request, response) {
    // Implementacja usuwania filmu
}

export async function formAction(request, response) {
    // Implementacja formularza
}

export async function saveAction(request, response) {
    // Implementacja zapisywania filmu
}