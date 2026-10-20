$ErrorActionPreference = 'Stop'
$characters = @{}
foreach ($name in @('boy', 'girl')) {
  $source = [xml](Get-Content -LiteralPath "public/characters/revision-02/$name-reference.svg" -Raw)
  $characters[$name] = @($source.SelectNodes("//*[local-name()='path']") | ForEach-Object {
    $fill = $_.GetAttribute('fill')
    if (-not $fill) { $fill = '#000000' }
    @{
      d = $_.GetAttribute('d')
      fill = $fill
      transform = $_.GetAttribute('transform')
      fillRule = 'nonzero'
    }
  })
}
$target = Join-Path (Get-Location) 'src/dream/character-vectors.json'
[System.IO.File]::WriteAllText("$target.partial", ($characters | ConvertTo-Json -Depth 5), [System.Text.UTF8Encoding]::new($false))
Move-Item -LiteralPath "$target.partial" -Destination $target -Force
Write-Output "Prepared original SVG vector paths for both characters."
