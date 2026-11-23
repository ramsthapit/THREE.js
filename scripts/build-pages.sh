#!/bin/bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
site="$root/_site"
rm -rf "$site"
mkdir -p "$site"

links=""
for dir in "$root"/*/; do
  name="$(basename "$dir")"
  slug="${name#[0-9][0-9]-}"
  if [ -f "$dir/package.json" ]; then
    (
      cd "$dir"
      [ -d node_modules ] || npm ci --no-audit --no-fund --loglevel=error
      rm -rf dist
      # webpack 5.14 in these lessons only builds on Node 16
      npx -y node@16 node_modules/webpack/bin/webpack.js --config ./bundler/webpack.prod.js >/dev/null
    )
    cp -R "$dir/dist" "$site/$slug"
  elif [ -f "$dir/index.html" ]; then
    cp -R "$dir" "$site/$slug"
  else
    continue
  fi
  title="$(echo "$slug" | tr '-' ' ')"
  links="$links      <a href=\"$slug/\">$title</a>\n"
  echo "built $slug"
done

find "$site" -name '*.map' -delete
find "$site" -name '*.LICENSE.txt' -delete
touch "$site/.nojekyll"

cat > "$site/index.html" <<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Three.js scenes</title>
  <style>
    body { margin: 0; padding: 3rem 1.5rem; background: #0d1117; color: #c9d1d9; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
    main { max-width: 900px; margin: 0 auto; }
    h1 { color: #58a6ff; font-size: 1.4rem; }
    p { color: #8b949e; font-size: 0.9rem; }
    nav { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.8rem; margin-top: 2rem; }
    a { display: block; padding: 0.9rem 1rem; border: 1px solid #30363d; border-radius: 8px; background: #161b22; color: #c9d1d9; text-decoration: none; text-transform: capitalize; }
    a:hover { border-color: #58a6ff; color: #58a6ff; }
  </style>
</head>
<body>
  <main>
    <h1>Three.js scenes</h1>
    <p>WebGL experiments built with Three.js. Pick a scene to open it.</p>
    <nav>
$(printf "%b" "$links")    </nav>
  </main>
</body>
</html>
HTML
