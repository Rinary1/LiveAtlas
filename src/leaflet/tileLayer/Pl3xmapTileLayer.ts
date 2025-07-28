/*
 * Copyright 2022 James Lyne
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Util} from "leaflet";
import {LiveAtlasTileLayer, LiveAtlasTileLayerOptions} from "@/leaflet/tileLayer/LiveAtlasTileLayer";

// noinspection JSUnusedGlobalSymbols
export class Pl3xmapTileLayer extends LiveAtlasTileLayer {
	constructor(map: LiveAtlasTileLayerOptions) {
		super(map);
		this._url = `${map.baseUrl}{z}/${map.renderer}/{x}_{y}.png`;
        Util.setOptions(this, {
          zoomReverse: false,
          minNativeZoom: 0,
          maxNativeZoom: map.nativeZoomLevels || 1, // взять из параметров мира
          maxZoom: map.maxZoom || map.nativeZoomLevels + (map.extraZoomLevels || 2),
          zoomOffset: -(map.extraZoomLevels || 2),
          tileSize: map.tileSize || 512,
          noWrap: true,
        });
	}
    
    _getZoomForUrl(): number {
        const zoom: number = this._tileZoom!;
        const maxZoom: number = this.options.maxZoom!;
        const offset: number = this.options.zoomOffset!;
        return (maxZoom - zoom) + offset;
    }

    getTileUrl(coords: L.Coords): string {
        const z = this._getZoomForUrl();
        return this._url
            .replace('{x}', String(coords.x))
            .replace('{y}', String(coords.y))
            .replace('{z}', String(z));
    }
}
