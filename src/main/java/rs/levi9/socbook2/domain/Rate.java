package rs.levi9.socbook2.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "rate")
public class Rate extends BaseEntity {

	private BookmarkUser bookmarkUser;
	private Bookmark bookmark;
	private Integer rateMark;
	private Date createdAt;
	
	public Rate() {}
	
	public Rate(BookmarkUser bookmarkUser, Bookmark bookmark, Integer rateMark, Date createdAt) {		
		this.bookmarkUser = bookmarkUser;
		this.bookmark = bookmark;
		this.rateMark = rateMark;
		this.createdAt = createdAt;
	}

	public BookmarkUser getBookmarkUser() {
		return bookmarkUser;
	}

	public void setBookmarkUser(BookmarkUser bookmarkUser) {
		this.bookmarkUser = bookmarkUser;
	}

	public Bookmark getBookmark() {
		return bookmark;
	}

	public void setBookmark(Bookmark bookmark) {
		this.bookmark = bookmark;
	}

	public Integer getRateMark() {
		return rateMark;
	}

	public void setRateMark(Integer rateMark) {
		this.rateMark = rateMark;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}	
}
