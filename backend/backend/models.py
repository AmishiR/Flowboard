from django.db import models

class Note(models.Model):
    # Matches data.description
    description = models.TextField()
    # Matches data.filesize
    filesize = models.CharField(max_length=20, default=".9mb")
    # Matches data.close
    close = models.BooleanField(default=False)
    # Matches data.tagColor
    tag_color = models.CharField(max_length=20, default="green")
    # Matches data.tag.tagTitle
    tag_title = models.CharField(max_length=50, default="Download Now")
    # Matches data.tag.isOpen
    is_tag_open = models.BooleanField(default=True)

    def __str__(self):
        return f"Note: {self.description[:20]}..."