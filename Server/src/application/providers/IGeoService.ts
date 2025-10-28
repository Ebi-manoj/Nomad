import { Feature, LineString, Point, Position } from 'geojson';

export interface IGeoService {
  createLine(coords: [number, number][]): Feature<LineString>;
  createPoint(coord: Position): Feature<Point>;
  pointToLineDistance(point: Feature<Point>, line: Feature<LineString>): number;
  nearestPointOnLine(
    line: Feature<LineString>,
    point: Feature<Point>
  ): Feature<Point>;
  lineDistance(
    start: Feature<Point>,
    end: Feature<Point>,
    line: Feature<LineString>
  ): number;
}
