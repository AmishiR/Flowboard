from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt # ✅ Add this import
from .models import Note

def get_notes(request):
    notes = Note.objects.all()
    data = []
    for note in notes:
        data.append({
            "id": note.id,
            "description": note.description,
            "filesize": note.filesize,
            "close": note.close,
            "tagColor": note.tag_color,
            "tag": {
                "isOpen": note.is_tag_open,
                "tagTitle": note.tag_title
            }
        })
    return JsonResponse(data, safe=False)

@csrf_exempt # ✅ Add this to allow the DELETE request from React
def delete_note(request, note_id):
    if request.method == "DELETE":
        try:
            note = Note.objects.get(id=note_id)
            note.delete()
            return JsonResponse({"message": "Deleted successfully"}, status=204)
        except Note.DoesNotExist:
            # Returns an error if the note ID isn't found
            return JsonResponse({"error": "Note not found"}, status=404)