export function initQuillEditor(elementId) {
    const quill = new Quill(elementId, {
        theme: 'snow'
    });
    return quill;
}