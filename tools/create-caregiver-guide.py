from pathlib import Path

from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT = OUTPUT_DIR / "Kennys-Workshop-Caregiver-Guide.pdf"
HERO = ROOT / "dist" / "assets" / "hero-workshop.jpg"
SITE_URL = "https://kennys-workshop.pdxroberto.chatgpt.site"

NAVY = HexColor("#0D304C")
NAVY_DARK = HexColor("#071F33")
BLUE = HexColor("#176DA4")
CREAM = HexColor("#FFFDF7")
CREAM_DARK = HexColor("#F0E1C7")
BRASS = HexColor("#E3A526")
GOLD = HexColor("#F2CA63")
GREEN = HexColor("#246840")
PURPLE = HexColor("#653D88")
RED = HexColor("#A52D36")
INK = HexColor("#132536")
MUTED = HexColor("#536578")


def register_fonts():
    regular = Path("C:/Windows/Fonts/segoeui.ttf")
    bold = Path("C:/Windows/Fonts/segoeuib.ttf")
    serif_bold = Path("C:/Windows/Fonts/georgiab.ttf")
    if regular.exists():
        pdfmetrics.registerFont(TTFont("GuideSans", str(regular)))
    if bold.exists():
        pdfmetrics.registerFont(TTFont("GuideSansBold", str(bold)))
    if serif_bold.exists():
        pdfmetrics.registerFont(TTFont("GuideSerifBold", str(serif_bold)))


register_fonts()
SANS = "GuideSans" if "GuideSans" in pdfmetrics.getRegisteredFontNames() else "Helvetica"
SANS_BOLD = "GuideSansBold" if "GuideSansBold" in pdfmetrics.getRegisteredFontNames() else "Helvetica-Bold"
SERIF_BOLD = "GuideSerifBold" if "GuideSerifBold" in pdfmetrics.getRegisteredFontNames() else "Times-Bold"


def style(name, size, leading=None, color=INK, font=SANS, align=TA_LEFT, space_after=0):
    return ParagraphStyle(
        name,
        fontName=font,
        fontSize=size,
        leading=leading or size * 1.24,
        textColor=color,
        alignment=align,
        spaceAfter=space_after,
    )


BODY = style("Body", 10.4, 14.2)
SMALL = style("Small", 8.4, 11.2, color=MUTED)
CARD_TITLE = style("CardTitle", 12.4, 15, color=NAVY, font=SANS_BOLD)
WHITE_SMALL = style("WhiteSmall", 8.8, 11.3, color=white)


def paragraph(c, text, x, y_top, width, pstyle=BODY, max_height=500):
    p = Paragraph(text, pstyle)
    _, height = p.wrap(width, max_height)
    p.drawOn(c, x, y_top - height)
    return height


def rounded_panel(c, x, y, width, height, fill=CREAM, stroke=CREAM_DARK, radius=12, line=1.4):
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.setLineWidth(line)
    c.roundRect(x, y, width, height, radius, fill=1, stroke=1)


def footer(c, page_number):
    c.setStrokeColor(CREAM_DARK)
    c.line(36, 30, 576, 30)
    c.setFont(SANS, 7.6)
    c.setFillColor(MUTED)
    c.drawString(36, 17, "Kenny's Workshop - caregiver quick guide")
    c.drawRightString(568, 17, f"Page {page_number}")


def page_title(c, title, subtitle, page_number):
    c.setFillColor(NAVY)
    c.rect(0, 710, 612, 82, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, 705, 612, 5, fill=1, stroke=0)
    c.setFont(SERIF_BOLD, 25)
    c.setFillColor(white)
    c.drawString(36, 752, title)
    paragraph(c, subtitle, 36, 735, 535, WHITE_SMALL)
    footer(c, page_number)


def draw_qr(c, x, y, size):
    widget = qr.QrCodeWidget(SITE_URL)
    bounds = widget.getBounds()
    width = bounds[2] - bounds[0]
    height = bounds[3] - bounds[1]
    drawing = Drawing(size, size, transform=[size / width, 0, 0, size / height, 0, 0])
    drawing.add(widget)
    drawing.drawOn(c, x, y)


def cover_page(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, 612, 792, fill=1, stroke=0)
    c.drawImage(str(HERO), 0, 486, width=612, height=306, preserveAspectRatio=True, anchor="c")
    c.setFillColor(NAVY)
    c.roundRect(34, 452, 544, 90, 13, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(34, 452, 544, 5, fill=1, stroke=0)
    c.setFont(SERIF_BOLD, 31)
    c.setFillColor(white)
    c.drawString(55, 502, "Kenny's Workshop")
    c.setFont(SANS_BOLD, 12)
    c.setFillColor(GOLD)
    c.drawString(56, 480, "CAREGIVER QUICK-START GUIDE")

    c.setFont(SERIF_BOLD, 20)
    c.setFillColor(NAVY)
    c.drawString(36, 416, "Start in four easy steps")

    steps = [
        ("1", "Open the app", "On Kenny's Windows laptop, open Microsoft Edge and visit the workshop address below."),
        ("2", "Choose one activity", "Use one of the five large activity cards. There is no timer, score pressure, or wrong place to begin."),
        ("3", "Use spoken help", "Select Hear this page or any speaker button. Nothing plays automatically, and every spoken item also appears as text."),
        ("4", "Return Home anytime", "The Home button stays at the bottom of every screen. Progress and Favorites save in this browser."),
    ]
    y = 370
    for number, title, copy in steps:
        c.setFillColor(NAVY)
        c.circle(56, y + 5, 15, fill=1, stroke=0)
        c.setFillColor(GOLD)
        c.setFont(SANS_BOLD, 12)
        c.drawCentredString(56, y + 1, number)
        paragraph(c, f"<b>{title}</b><br/>{copy}", 84, y + 22, 380, BODY, 75)
        y -= 72

    rounded_panel(c, 472, 177, 106, 160, fill=white, stroke=BRASS, radius=12, line=2)
    draw_qr(c, 488, 222, 74)
    paragraph(c, "<b>Scan to open</b>", 486, 209, 78, style("QRTitle", 8.5, 10, color=NAVY, font=SANS_BOLD, align=TA_CENTER))
    paragraph(c, "Use Microsoft Edge on Windows.", 484, 198, 82, style("QRCopy", 6.9, 8.5, color=MUTED, align=TA_CENTER))

    rounded_panel(c, 36, 54, 540, 77, fill=CREAM_DARK, stroke=BRASS, radius=10, line=1.5)
    paragraph(c, "<b>Workshop address</b>", 52, 113, 500, CARD_TITLE)
    paragraph(c, SITE_URL, 52, 91, 500, style("URL", 9.5, 12, color=BLUE, font=SANS_BOLD))
    paragraph(c, "This is a recreation and reminiscence app, not a medical test or treatment.", 52, 73, 500, SMALL)
    footer(c, 1)
    c.showPage()


def activities_page(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, 612, 792, fill=1, stroke=0)
    page_title(c, "What is inside", "Each area presents one clear idea at a time and always allows a return to Home.", 2)

    activities = [
        ("1", "Mechanical Puzzles", "60 multiple-choice questions across mechanics, submarines, race cars, motorcycles, and 1960s/1970s music culture. Hints and explanations are always available.", HexColor("#A55723")),
        ("2", "Interactive Virtual Workshop", "Six familiar stations - multimeter, blueprint, wrenches, gears, engine, and toolbox - each with a short fact and challenge.", GREEN),
        ("3", "Memory & Conversation", "Twelve respectful prompts invite stories without testing memory. There is no correct response and any card can be skipped.", PURPLE),
        ("4", "Submarines, Cars & Motorcycles", "Fifteen fact cards explain machines and engineering at a public, non-sensitive level, with an optional related quiz.", BLUE),
        ("5", "Music & Stories", "Three original songs made especially for Kenny, eight original narrated stories, transcripts, and music-culture questions.", RED),
    ]
    y = 660
    for number, title, copy, accent in activities:
        rounded_panel(c, 36, y - 92, 540, 104, fill=white, stroke=CREAM_DARK, radius=12, line=1.2)
        c.setFillColor(accent)
        c.roundRect(36, y - 92, 14, 104, 7, fill=1, stroke=0)
        c.circle(76, y - 39, 18, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont(SANS_BOLD, 13)
        c.drawCentredString(76, y - 44, number)
        paragraph(c, title, 108, y - 12, 438, CARD_TITLE)
        paragraph(c, copy, 108, y - 37, 438, BODY, 72)
        y -= 116

    rounded_panel(c, 36, 45, 540, 56, fill=NAVY, stroke=NAVY_DARK, radius=10)
    paragraph(c, "A good session can be three questions, one story, or a single conversation card. Stopping while the activity still feels pleasant is a success.", 52, 88, 508, style("BottomNote", 9.1, 12.2, color=white, font=SANS_BOLD))
    c.showPage()


def settings_page(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, 612, 792, fill=1, stroke=0)
    page_title(c, "Comfort, privacy, and troubleshooting", "The Settings page keeps controls predictable and gives caregivers a few practical choices.", 3)

    c.setFont(SERIF_BOLD, 18)
    c.setFillColor(NAVY)
    c.drawString(36, 670, "Recommended starting settings")
    settings = [
        ("Text size", "Large; increase to Extra large or Largest if Kenny leans toward the screen."),
        ("Challenge level", "Standard; use Steady on a tiring day or Challenge when he wants harder technical questions."),
        ("Session length", "Five questions; three is a good shorter option."),
        ("Speaking speed", "About 88 percent for a calm, natural pace."),
        ("Submarine topics", "On by default; turn them off any day they are not comfortable."),
    ]
    y = 636
    for label, copy in settings:
        c.setFillColor(BRASS)
        c.circle(44, y - 3, 3.2, fill=1, stroke=0)
        paragraph(c, f"<b>{label}:</b> {copy}", 56, y + 6, 516, BODY)
        y -= 38

    rounded_panel(c, 36, 330, 260, 104, fill=white, stroke=GREEN, radius=12, line=1.5)
    paragraph(c, "<b>Privacy by design</b>", 52, 412, 228, CARD_TITLE)
    paragraph(c, "No account, ads, camera, or microphone. Progress and Favorites stay in the browser unless a caregiver exports a backup.", 52, 388, 228, BODY)

    rounded_panel(c, 316, 330, 260, 104, fill=white, stroke=PURPLE, radius=12, line=1.5)
    paragraph(c, "<b>Supportive language</b>", 332, 412, 228, CARD_TITLE)
    paragraph(c, "Try: 'Take your time,' 'Good thinking,' or 'Want another one?' Avoid treating the activity as a memory examination.", 332, 388, 228, BODY)

    c.setFont(SERIF_BOLD, 18)
    c.setFillColor(NAVY)
    c.drawString(36, 290, "If something does not work")
    troubleshooting = [
        "Make sure the app is open in a current version of Microsoft Edge, not Internet Explorer.",
        "If sound is quiet, check the laptop volume, then use the song volume control in Settings.",
        "If a page looks crowded, use the browser's zoom controls or choose a smaller app text size.",
        "If progress should start fresh, Settings includes Reset local progress. Questions and stories will remain.",
        "The app can work offline after one online visit. The three songs need an internet connection.",
    ]
    y = 258
    for item in troubleshooting:
        c.setFillColor(BLUE)
        c.circle(44, y - 3, 3.2, fill=1, stroke=0)
        used = paragraph(c, item, 56, y + 6, 516, BODY)
        y -= max(29, used + 8)

    rounded_panel(c, 36, 52, 540, 70, fill=NAVY, stroke=NAVY_DARK, radius=10)
    paragraph(c, "<b>Caregiver check:</b> Kenny should be able to find Home, start one activity, replay instructions, skip a question, and recover from a mistaken click without assistance.", 52, 106, 508, style("Check", 9.2, 12.4, color=white, font=SANS_BOLD))
    footer(c, 3)
    c.showPage()


def build():
    c = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    c.setTitle("Kenny's Workshop Caregiver Quick-Start Guide")
    c.setAuthor("Kenny's Workshop")
    c.setSubject("Quick-start and caregiver guide")
    cover_page(c)
    activities_page(c)
    settings_page(c)
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()

