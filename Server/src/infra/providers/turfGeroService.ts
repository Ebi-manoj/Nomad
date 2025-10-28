import { Feature, LineString, Point } from 'geojson';
import { IGeoService } from '../../application/providers/IGeoService';
import * as turf from '@turf/turf';

export class TurfGeoService implements IGeoService {
  createLine(coords: [number, number][]): Feature<LineString> {
    return turf.lineString(coords);
  }

  createPoint(coord: [number, number]): Feature<Point> {
    return turf.point(coord);
  }

  pointToLineDistance(
    point: Feature<Point>,
    line: Feature<LineString>
  ): number {
    return turf.pointToLineDistance(point, line, { units: 'kilometers' });
  }

  nearestPointOnLine(
    line: Feature<LineString>,
    point: Feature<Point>
  ): Feature<Point> {
    return turf.nearestPointOnLine(line, point);
  }

  lineDistance(
    start: Feature<Point>,
    end: Feature<Point>,
    line: Feature<LineString>
  ): number {
    const slicedLine = turf.lineSlice(start, end, line);
    return turf.length(slicedLine, { units: 'kilometers' });
  }
  distanceBetweenPoints(a: Feature<Point>, b: Feature<Point>): number {
    return turf.distance(a, b, { units: 'kilometers' });
  }
  getLineLength(line: Feature<LineString>): number {
    return turf.length(line, { units: 'kilometers' });
  }
  calculateDistanceAlongLine(
    startPoint: Feature<Point>,
    targetPoint: Feature<Point>,
    line: Feature<LineString>
  ): number {
    const slicedLine = turf.lineSlice(startPoint, targetPoint, line);
    return turf.length(slicedLine, { units: 'kilometers' });
  }
}
