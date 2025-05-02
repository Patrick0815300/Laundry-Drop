/**
 * FilterDescriptionPipe
 * Diese Pipe filtert ein Array von Objekten nach einem Suchtext,
 * indem sie das Feld `description` jedes Objekts durchsucht.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filteredArticles',        // Name der Pipe im Template
    standalone: true,
    pure: true                        // Explizit reine Pipe (Default, aber für Klarheit hinzugefügt)
})
export class FilterDescriptionPipe implements PipeTransform {
    /**
     * transform
     * @param items Array von Objekten mit mindestens dem Feld `description`
     * @param searchText Suchtext, nach dem gefiltert wird
     * @returns Neues Array mit Objekten, deren `description` den Suchtext enthält
     */
    transform<T extends { description: string }>(
        items: T[] | null | undefined,
        searchText: string | null | undefined
    ): T[] {
        // Schutz: Wenn `items` null oder undefined ist, gib leeres Array zurück
        if (!items) {
            return [];
        }

        // Wenn kein Suchtext, gib das Original-Array zurück (Performance)
        if (!searchText) {
            return items;
        }

        // Suchtext nur einmal in Kleinbuchstaben umwandeln
        const term = searchText.toLowerCase();

        // Filter anwenden
        return items.filter(item =>
            item.description.toLowerCase().includes(term)
        );
    }
}