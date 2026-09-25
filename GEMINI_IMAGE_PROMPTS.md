# Keep Hauling Image Generation Guide

## Project Analysis

Keep Hauling is a Vite + React + Tailwind website for a truck dispatching and freight management company. The active app is `src/App.jsx`; `src/App copy.jsx` is an older reference version with a larger image map.

The site speaks to owner-operators and small carriers. Its visual language is practical, direct, and operational rather than glossy or corporate:

- Brand: Keep Hauling
- Business: truck dispatching, load finding, rate negotiation, broker communication, and freight management
- Audience: owner-operators and small carriers running dry vans, reefers, flatbeds, step decks, box trucks, power-only units, and hotshots
- Core palette: deep navy `#0B1D33`, near-black navy `#061220`, steel blue `#1F3A5F`, dispatch red `#E63946`, utility amber `#F4A81E`, white, and cool paper gray `#EEF1F5`
- Typography: condensed display headlines with readable sans-serif body copy
- Mood: dependable, alert, capable, human, and road-tested
- Composition: strong horizontal lines, useful negative space, bold subject placement, and room for white text over dark overlays

The active implementation currently imports only `src/assets/truck.jpg`. `RouteBackdrop` uses it for the homepage and interior page heroes, while `EquipmentPanel` reuses it for every equipment card. The goal of these images is to replace that repetition with a coherent, original image family.

## Image Set To Generate

Generate these files and place them in `src/assets/generated/`:

| File                         | Use                                        | Recommended size | Crop             |
| ---------------------------- | ------------------------------------------ | ---------------- | ---------------- |
| `keep-hauling-hero.jpg`      | Homepage hero and broad marketing sections | 2400 x 1350      | 16:9 landscape   |
| `keep-hauling-warehouse.jpg` | About and How It Works page headers        | 2400 x 1350      | 16:9 landscape   |
| `equipment-dry-van.jpg`      | Dry Van cards and detail page              | 1600 x 1000      | 8:5 landscape    |
| `equipment-reefer.jpg`       | Reefer cards and detail page               | 1600 x 1000      | 8:5 landscape    |
| `equipment-flatbed.jpg`      | Flatbed cards and detail page              | 1600 x 1000      | 8:5 landscape    |
| `equipment-step-deck.jpg`    | Step Deck cards and detail page            | 1600 x 1000      | 8:5 landscape    |
| `equipment-box-truck.jpg`    | Box Truck cards and detail page            | 1600 x 1000      | 8:5 landscape    |
| `equipment-power-only.jpg`   | Power Only cards and detail page           | 1600 x 1000      | 8:5 landscape    |
| `equipment-hotshot.jpg`      | Hotshot cards and detail page              | 1600 x 1000      | 8:5 landscape    |
| `og-image.jpg`               | Social sharing preview                     | 1200 x 630       | 1.91:1 landscape |

Do not generate a logo, text lockup, phone number, website address, or advertising copy inside the images. The React UI supplies all text. Use real-looking but generic trucks with no readable company branding, no invented logos, and no license plates that can be read.

## Shared Gemini Instructions

Paste the relevant prompt below into Gemini. Keep the shared instructions in the prompt so the outputs stay visually consistent.

```text
Create a photorealistic commercial editorial photograph for Keep Hauling, a professional US truck dispatching and freight management company. The visual style is grounded, capable, and road-tested: deep navy shadows, steel blue surfaces, restrained dispatch red accents, natural daylight, realistic working trucks, authentic American freight environments, and subtle cinematic contrast. Avoid glossy stock-photo perfection. Show believable scale, correct truck proportions, accurate trailer hardware, clean but used equipment, and natural human behavior.

The image will be used on a responsive website. Keep the main subject clear and recognizable. Leave calm, low-detail negative space where requested so HTML text can sit over the image. Do not include any readable words, letters, numbers, logos, trademarks, watermarks, fake UI, fake road signs, or branded uniforms. Do not add a red color cast, dramatic lens flare, excessive haze, surreal skies, duplicated wheels, malformed hands, warped trailer geometry, or unsafe driving behavior. Do not show crashes, traffic violations, unsecured cargo, or dangerous loading.

Use a documentary commercial photography look, 35mm or 50mm lens feel, realistic depth of field, natural material texture, crisp details, and restrained color grading. Render as a high-resolution landscape image suitable for cropping on desktop and mobile.
```

## Prompts

### 1. Homepage Hero: `keep-hauling-hero.jpg`

```text
Create a wide 16:9 hero photograph of a modern American Class 8 semi-truck with a clean dry van trailer traveling on an open interstate at early morning. The truck is positioned on the right half of the frame and moves toward the viewer at a slight three-quarter angle. The left half contains dark, simple road and sky negative space for a large white website headline. Include subtle lane markings and a distant horizon, with no city-name signs and no readable text. The scene should communicate nationwide freight movement, confidence, and forward progress. Use cool navy and steel tones with a restrained warm sunrise edge, realistic road texture, and no exaggerated action effects.
```

### 2. Warehouse / About / Process: `keep-hauling-warehouse.jpg`

```text
Create a wide 16:9 documentary photograph inside a clean but active American freight distribution warehouse. Show a dispatcher or logistics professional in the midground reviewing freight information at a workstation while a loading dock and one trailer are visible behind them. The person should look focused and approachable, dressed in plain dark workwear with no logo. Keep the left third darker and uncluttered for white headline text. Include realistic pallets, dock doors, safety lines, and industrial lighting, but no readable labels or screens. The result should communicate organized communication, hands-on freight knowledge, and dependable daily operations rather than a futuristic office.
```

### 3. Dry Van: `equipment-dry-van.jpg`

```text
Create an 8:5 landscape commercial photograph of a standard white dry van semi-trailer parked at a regional distribution facility, viewed from a low three-quarter rear angle. Show the full trailer silhouette and tractor connection clearly, with a few neutral pallets near a dock but no readable packaging. Use a clean industrial yard, overcast daylight, steel blue and navy shadows, and generous uncluttered space around the truck. The image should feel reliable and everyday: general freight, retail distribution, and steady lanes. No logos, signs, or text.
```

### 4. Reefer: `equipment-reefer.jpg`

```text
Create an 8:5 landscape photorealistic photograph of a white refrigerated trailer at a food distribution loading dock. Show the refrigeration unit at the front of the trailer and a subtle sense of cold air without fantasy fog. Include clean dock equipment and a few sealed produce pallets in the background, with no readable labels. Use crisp cool daylight, realistic condensation only where physically plausible, and a composed three-quarter angle that keeps the trailer recognizable. The mood is precise, temperature-controlled, and dependable. No logos or text.
```

### 5. Flatbed: `equipment-flatbed.jpg`

```text
Create an 8:5 landscape documentary photograph of a heavy-duty flatbed truck carrying properly secured steel beams at an industrial yard. Show visible chains, straps, edge protection, and realistic load securement without making the image cluttered. Frame the truck from a three-quarter side angle so the open deck and cargo are unmistakable. Use early daylight, steel gray materials, navy shadows, and a restrained red accent on a small piece of equipment only if natural. No workers in unsafe positions, no readable markings, no logos, and no text.
```

### 6. Step Deck: `equipment-step-deck.jpg`

```text
Create an 8:5 landscape commercial photograph of a step-deck trailer carrying a large piece of construction or agricultural machinery on a quiet industrial road. Make the two deck heights obvious and show realistic chains, straps, and clearance. Use a three-quarter front-side composition with the full trailer visible, natural daylight, and a modest rural-industrial background. The result should communicate specialized planning and oversized freight expertise. Keep all signage and machine markings unreadable; no logos, no text, no unsafe load.
```

### 7. Box Truck: `equipment-box-truck.jpg`

```text
Create an 8:5 landscape photograph of a medium-duty box truck making a regional commercial delivery outside a small warehouse. Show the complete box truck in a three-quarter angle, a closed cargo box, and one or two neutral parcels or pallets near the dock. The scale should feel local and efficient rather than long-haul. Use bright but natural morning light, clean pavement, navy and steel tones, and no branded graphics, readable labels, or text anywhere in the frame.
```

### 8. Power Only: `equipment-power-only.jpg`

```text
Create an 8:5 landscape photorealistic photograph of a highway tractor operating in a trailer yard with several unbranded dry van trailers in the background. The tractor is centered slightly to the right and clearly shown without a trailer attached, communicating power-only operations. Use a believable intermodal or distribution yard, realistic spacing, soft overcast daylight, and strong horizontal lines. Keep one side of the frame simple enough for a card crop. No readable trailer numbers, logos, company names, or text.
```

### 9. Hotshot: `equipment-hotshot.jpg`

```text
Create an 8:5 landscape documentary photograph of a heavy-duty pickup truck towing a gooseneck flatbed trailer with a compact piece of construction equipment securely strapped down. Show the full pickup and trailer from a three-quarter side angle on a rural-industrial road. The rig must have believable proportions and safe tie-downs. Use natural late-afternoon light, realistic dust kept subtle, and a capable fast-response feeling without action-movie exaggeration. No logos, license plate detail, road text, or watermark.
```

### 10. Social Preview: `og-image.jpg`

```text
Create a 1.91:1 landscape social-sharing image for a professional truck dispatching company. Show one recognizable modern semi-truck on the right side of a broad interstate scene with strong navy negative space on the left for an HTML title overlay. The composition should remain legible when reduced to a small social card. Use photorealistic commercial editorial lighting, steel blue road tones, a restrained dispatch-red detail, and a clean horizon. Do not render any words, logos, signs, watermarks, or fake brand marks in the image.
```

## Gemini Generation Workflow

1. Open Gemini and paste the shared instructions followed by one asset prompt.
2. Generate four variations for the hero and warehouse images, and two variations for each equipment image.
3. Choose the version with the cleanest truck geometry, the clearest equipment type, and the most useful negative space. Do not choose based only on dramatic lighting.
4. Ask Gemini for a revision when there is bad geometry, invented text, a logo, a malformed wheel, an unsafe load, or an unusable crop. Keep the original subject and request only the correction.
5. Export as JPG, use the exact filenames in the table, and keep the long edge at the recommended size or larger.
6. Put the files in `src/assets/generated/`. Keep the original `src/assets/truck.jpg` until the new images have been wired and tested.
7. Before publishing, inspect each image at desktop hero crop, mobile hero crop, and the small equipment-card crop. A good source image must survive all three.

## Wiring Notes

The active code needs a small follow-up image-map change after the files are generated:

- Import the generated files in `src/App.jsx`.
- Update `RouteBackdrop` to use the hero image for the homepage and the warehouse image where an interior page needs a different backdrop.
- Add an `image` field to each `EQUIPMENT` object and update `EquipmentPanel` to use that field instead of the shared `truckImage`.
- Keep the existing navy overlay over hero images so the white headlines remain readable.
- Keep meaningful `alt` text on content images. Decorative hero backdrops should continue using `alt=""`.
- Compress exported JPGs before production if they are larger than necessary; the page is image-heavy and should not ship unnecessarily large originals.

## Quality Checklist

- [ ] No generated image contains readable text, logos, watermarks, or invented branding.
- [ ] Truck and trailer type are unmistakable for each equipment image.
- [ ] Wheels, axles, mirrors, trailer connections, and load securement look physically correct.
- [ ] The hero keeps its subject visible after a mobile `object-cover` crop.
- [ ] The left side of hero images remains quiet enough for HTML text.
- [ ] Colors support the existing navy, steel, red, and amber design system.
- [ ] Images look like a consistent Keep Hauling family, not unrelated stock photos.
- [ ] Files use the exact names and live under `src/assets/generated/`.
- [ ] The app still builds after wiring the imports.
