param(
  [Parameter(Mandatory = $true)]
  [string]$OutputDirectory
)

Add-Type -AssemblyName System.Drawing

function New-WorkshopIcon {
  param(
    [int]$Size,
    [string]$Path
  )

  $bitmap = New-Object System.Drawing.Bitmap($Size, $Size)
  $bitmap.SetResolution(96, 96)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#12314a'))

  $scale = $Size / 512.0
  $ringPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml('#dce9f0'), (22 * $scale))
  $ringPen.Color = [System.Drawing.Color]::FromArgb(180, $ringPen.Color)
  $graphics.DrawEllipse($ringPen, 73 * $scale, 73 * $scale, 366 * $scale, 366 * $scale)

  $subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#f2c14e'))
  $subPath = New-Object System.Drawing.Drawing2D.GraphicsPath
  $points = [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new(90 * $scale, 276 * $scale),
    [System.Drawing.PointF]::new(144 * $scale, 186 * $scale),
    [System.Drawing.PointF]::new(227 * $scale, 146 * $scale),
    [System.Drawing.PointF]::new(338 * $scale, 146 * $scale),
    [System.Drawing.PointF]::new(372 * $scale, 146 * $scale),
    [System.Drawing.PointF]::new(411 * $scale, 201 * $scale),
    [System.Drawing.PointF]::new(464 * $scale, 230 * $scale),
    [System.Drawing.PointF]::new(411 * $scale, 259 * $scale),
    [System.Drawing.PointF]::new(372 * $scale, 314 * $scale),
    [System.Drawing.PointF]::new(338 * $scale, 314 * $scale),
    [System.Drawing.PointF]::new(227 * $scale, 314 * $scale),
    [System.Drawing.PointF]::new(144 * $scale, 274 * $scale)
  )
  $subPath.AddPolygon($points)
  $graphics.FillPath($subBrush, $subPath)

  $windowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#12314a'))
  $graphics.FillEllipse($windowBrush, 295 * $scale, 203 * $scale, 42 * $scale, 42 * $scale)

  $anchorPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml('#f2c14e'), (25 * $scale))
  $anchorPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $anchorPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $graphics.DrawLine($anchorPen, 151 * $scale, 275 * $scale, 151 * $scale, 346 * $scale)
  $graphics.DrawLine($anchorPen, 111 * $scale, 346 * $scale, 191 * $scale, 346 * $scale)

  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $anchorPen.Dispose()
  $windowBrush.Dispose()
  $subPath.Dispose()
  $subBrush.Dispose()
  $ringPen.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
New-WorkshopIcon -Size 180 -Path (Join-Path $OutputDirectory 'workshop-mark-180.png')
New-WorkshopIcon -Size 192 -Path (Join-Path $OutputDirectory 'workshop-mark-192.png')
New-WorkshopIcon -Size 512 -Path (Join-Path $OutputDirectory 'workshop-mark-512.png')

