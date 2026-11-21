// Makes the web copies in projects/*/images, system/images, about/images and
// home/images from the full-resolution files in originals/ (as downloaded
// from the Wix site, 21 Nov 2026). Longest side 3200 px, JPEG quality 90;
// drawings stay PNG; the Charlotte Street animation (GIF) is copied as it is.
// A third entry { trim: true } cuts off a drawing's white margins, so the
// drawing starts at the image's left edge, in line with the text below it.
// { shiftTop: { height, dx } } first moves the top band of the drawing (its
// printed heading) sideways by dx pixels, so the heading starts on the same
// line as the drawing. { cropLeft: n } then cuts n pixels off the left (where
// only a line running off the edge would otherwise hold the margin open).
// Run again after changing the list: node tools/web-images.mjs
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const map = {
  'projects/knight-building/images': [
    ['a8d860_d08ea3016ba64c33bf66aea55c6fce66~mv2.jpg', '01-exterior-dusk.jpg'],
    ['a8d860_e20a484164094b75b17277a9e2bc5c3b~mv2.jpg', '02-exterior-aerial.jpg'],
    ['a8d860_f50328098d264b97afb5e93e716bf294~mv2.jpg', '03-exterior-meadow.jpg'],
    ['a8d860_e25e7cbf3f6b4833adb0f5fd46c041dc~mv2.jpg', '04-kitchen.jpg'],
    ['a8d860_c4ceca93af57408897e552a2b3bb9bdf~mv2.jpg', '05-living-room.jpg'],
    ['a8d860_6d680bf1e62144839e56cbcbae5272b6~mv2.jpg', '06-living-kitchen.jpg'],
    ['a8d860_3b0d65873a4d46f3b53b62e2ad97f10e~mv2.jpg', '07-stair.jpg'],
    ['a8d860_61274d4e285047ecabef17e9ab414d57~mv2.jpg', '08-path.jpg'],
    ['a8d860_c68ced6350614eba851e8b90c4695d07~mv2.jpg', '09-facade.jpg'],
    ['93b44c_1120f238f16a432e8e1a083b5fc864b8~mv2.jpg', '10-construction.jpg'],
    ['93b44c_20b2bf8a771043e9abc639f5d95d52c8~mv2.jpg', '11-module-setting.jpg'],
    ['93b44c_11c00de4ad584609a316e8253c0f084f~mv2.png', '12-plan.png'],
  ],
  'projects/charlotte-street-housing/images': [
    ['93b44c_e2fbd55e2fe4487b9d16304e3fae26ad~mv2.jpg', '01-exterior.jpg'],
    ['93b44c_41e4e1ca94eb462da6bf425b81ab339e~mv2.jpg', '02-unit.jpg'],
    ['93b44c_7439cc6d3d7f4559b984d5e0405e4e9b~mv2.gif', '03-assembly.gif'],
  ],
  'projects/missing-middle-housing/images': [
    ['93b44c_842086e92ada4889a7585e158515a261~mv2.jpg', '01-elevation.jpg'],
    ['93b44c_632ed303f5cf430c95a3d1b1a616ee53~mv2.jpg', '02-interior.jpg'],
    ['93b44c_08b8b20a9ade4ffe959a0d0060cd7cae~mv2.jpg', '03-bedroom.jpg'],
    ['93b44c_d0d7539d9f56429681e7155c84c1e75d~mv2.png', '04-unit-axonometric.png'],
    ['93b44c_99af206e1a7f4aa782286a3c0de35fc9~mv2.png', '05-massing-axonometric.png'],
    ['93b44c_57d038c1f10a4bc9bc1d742b409a958a~mv2.png', '06-stair-axonometric.png'],
  ],
  'projects/castlegar-housing/images': [
    ['93b44c_9cdd3a061bdc429ba267e27055d48461~mv2.jpg', '01-exterior.jpg'],
    ['93b44c_2c27a5e38fa6463a94d036965c5521a1~mv2.jpg', '02-interior.jpg'],
    ['93b44c_d53f75c709534ac8a12c4be95eae13e9~mv2.jpg', '03-unit.jpg'],
    ['93b44c_60b1316cd50247939818cb878d09e6eb~mv2.png', '04-module-components.png'],
    ['93b44c_10ddfdc1876b48a39e0a82ab8d28c409~mv2.jpg', '05-plans.jpg'],
    ['93b44c_6c177feaf15c472fa3cd0a9d3cb7db51~mv2.jpg', '06-module-setting.jpg'],
    ['93b44c_b3662e4ec6f04f3abe44fc78ddb17773~mv2.jpg', '07-assembly-hall.jpg'],
  ],
  'projects/european-school/images': [
    ['93b44c_8e58258e26104d36ba8de92b81373ef1~mv2.jpg', '01-exterior.jpg'],
    ['93b44c_d636fab3de0e45ada2315e5296d1125a~mv2.jpg', '02-stair.jpg'],
    ['93b44c_77b80ce6723549d3916a2c0a921cc3fb~mv2.jpg', '03-classroom.jpg'],
    ['93b44c_53de6d8cf87149398c27dfa7b8f90759~mv2.jpg', '04-assembly-hall.jpg'],
    ['93b44c_33684e3031a54b09a582b3d07d20e5da~mv2.jpg', '05-classroom.jpg'],
    ['93b44c_643edd45d3f840cd90344ee62c0676f3~mv2.jpg', '06-module.jpg'],
    ['93b44c_a32babdcb67b42698298d3768fbe040e~mv2.jpg', '07-corridor.jpg'],
    ['93b44c_45ec752e51ab4e6490e4516c438ef852~mv2.jpg', '08-facade.jpg'],
  ],
  'projects/integrated-comprehensive-school/images': [
    ['93b44c_ae477cbb786047cab3ab9dfe2fede57a~mv2.jpg', '01-exterior-dusk.jpg'],
    ['93b44c_0dbbed872e01495c8a73eb2ca281da82~mv2.jpg', '02-facade.jpg'],
    ['93b44c_41afa014f8c74396ae7a4db57ed1f9cf~mv2.jpg', '03-classroom.jpg'],
    ['93b44c_e43a32e40e1847f69a2dc4c2a9b90c42~mv2.jpg', '04-facade.jpg'],
    ['93b44c_4c5952347ed248d49c89d4788993f6ec~mv2.jpg', '05-exterior.jpg'],
    ['93b44c_a70fc35418b34bbcabcfda39a4126545~mv2.jpg', '06-construction.jpg'],
    ['93b44c_40a6cbbf765a4c2ba6c24fa4d6734f50~mv2.jpg', '07-ventilation.jpg'],
  ],
  'projects/daycare-center/images': [
    ['93b44c_1a17a600c72e43cbafc9988b3cebc0a7~mv2.jpg', '01-exterior.jpg'],
    ['93b44c_718b43da1e134879bac84bab3af0e646~mv2.jpg', '02-interior.jpg'],
    ['93b44c_e0f817ff25fd44278f7b932b1bd38fa9~mv2.jpg', '03-cladding.jpg'],
    ['93b44c_bb129bb286004b2298590a691e3699eb~mv2.jpg', '04-group-room.jpg'],
    ['93b44c_6fbac759ea0443a88e59e75d398b44af~mv2.jpg', '05-facade.jpg'],
    ['93b44c_83a1ba1b14434f1e808f2633104f4b5e~mv2.jpg', '06-cloakroom.jpg'],
  ],
  'projects/kaufmann-bausysteme-offices/images': [
    ['93b44c_4d8e141bce28430bb22fad04b01d8c07~mv2.jpg', '01-exterior.jpg'],
    ['93b44c_ffa57049b3b24c00b9d4eb5803bf1ce8~mv2.jpg', '02-facade-dusk.jpg'],
    ['93b44c_68704d526c3549a6bec32d718fd3a830~mv2.jpg', '03-aerial.jpg'],
    ['93b44c_a090295a495747b4bdda0deb3207098a~mv2.jpg', '04-assembly-hall.jpg'],
    ['93b44c_ac591d28f7c040e4b1a70432911031b0~mv2.jpg', '05-terrace.jpg'],
  ],
  'system/images': [
    ['93b44c_37cf14250d0b40bd89456cd562b69fbdf000.jpg', '01-assembly-video-poster.jpg'],
    ['93b44c_6c807480b824482e83f93bd7ee24405f~mv2.jpg', '02-module-exploded.jpg', { trim: true }],
    // Its heading started 28 px right of the drawing (heading at x 48, the first
    // parcel at x 20 in the 1140 px original): the heading (top 110 px) moves
    // left by 28 px, the street line running off the left edge is cut at the
    // parcel's tip (x 19), then the margins are trimmed (21 Nov, his ask).
    ['93b44c_6c177feaf15c472fa3cd0a9d3cb7db51~mv2.jpg', '03-module-setting.jpg', { trim: true, shiftTop: { height: 110, dx: -28 }, cropLeft: 19 }],
    ['93b44c_8b3ab74944da4410aad36f2aded4dd62~mv2.jpg', '04-assembly-hall.jpg'],
    ['93b44c_20b2bf8a771043e9abc639f5d95d52c8~mv2.jpg', '05-module-setting-site.jpg'],
  ],
  'about/images': [
    ['93b44c_f58d34120c9f4e328b095f776ff240ac~mv2.jpg', 'peter-rose.jpg'],
    ['93b44c_b2aa2619f23643519d7087820059f448~mv2.jpg', 'andreas-krawczyk.jpg'],
    ['93b44c_27c3cd67c1f047f3a7f12ff4a2bb3641~mv2.jpg', 'justin-cook.jpg'],
    ['93b44c_b49c2d94359e41a1b11d1766c84b58c0~mv2.jpg', 'christian-kaufmann.jpg'],
    ['a8d860_9f028198d574464891b2e342708853d3~mv2.png', 'news-think-wood.png'],
    ['a8d860_2f7c09557cc742a99e0455cd3f4150ba~mv2.jpg', 'news-architects-newspaper.jpg'],
    ['a8d860_a92ba8d7d5d743419227974ff13ad776~mv2.png', 'news-modular-advantage.png'],
    ['a8d860_73d2c8daa37045a688e757a1bbbee515~mv2.png', 'news-woodworks.png'],
  ],
};

const MAX = 3200;
for (const [dir, files] of Object.entries(map)) {
  fs.mkdirSync(dir, { recursive: true });
  for (const [src, dest, opts = {}] of files) {
    const from = path.join('originals', src);
    const to = path.join(dir, dest);
    if (dest.endsWith('.gif')) {
      fs.copyFileSync(from, to);
      continue;
    }
    let img = sharp(from, { limitInputPixels: false }).rotate();
    if (opts.shiftTop) {
      const { height, dx } = opts.shiftTop; // dx < 0: to the left
      const { width } = await sharp(from).metadata();
      const band = await sharp(from).extract({ left: -dx, top: 0, width: width + dx, height }).toBuffer();
      const blank = await sharp({ create: { width, height, channels: 3, background: '#ffffff' } }).png().toBuffer();
      img = sharp(
        await img
          .composite([
            { input: blank, left: 0, top: 0 },
            { input: band, left: 0, top: 0 },
          ])
          .png()
          .toBuffer(),
      );
    }
    if (opts.cropLeft) {
      const buf = await img.png().toBuffer();
      const { width, height } = await sharp(buf).metadata();
      img = sharp(await sharp(buf).extract({ left: opts.cropLeft, top: 0, width: width - opts.cropLeft, height }).toBuffer());
    }
    if (opts.trim) img = sharp(await img.trim({ background: '#ffffff', threshold: 24 }).toBuffer());
    img = img.resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true });
    img = dest.endsWith('.png') ? img.png({ compressionLevel: 9 }) : img.flatten({ background: '#fff' }).jpeg({ quality: 90, mozjpeg: true });
    await img.toFile(to);
  }
  console.log(dir, files.length);
}
