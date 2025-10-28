import { Feature, LineString, Point, Position } from 'geojson';

export interface IGeoService {
  createLine(coords: Position[]): Feature<LineString>;
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
  distanceBetweenPoints(a: Feature<Point>, b: Feature<Point>): number;
  getLineLength(line: Feature<LineString>): number;
  calculateDistanceAlongLine(
    startPoint: Feature<Point>,
    targetPoint: Feature<Point>,
    line: Feature<LineString>
  ): number;
}
