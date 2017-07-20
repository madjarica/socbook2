package rs.levi9.socbook2.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "bookmark")
public class Bookmark extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -4887631063917911430L;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private BookmarkUser bookmarkUser;
	
	@Column(nullable = false)
	@NotNull
	@DateTimeFormat
	private Date created_at;
	
	@Column(nullable = false)
	@NotNull	
	private boolean visible;
	
	@Column(nullable = false)
	@NotNull
	private String title;
	
	@Column(nullable = false)
	@NotNull
	private String description;
	
	@Column(nullable = false)
	@NotNull
	private String url;
	
	public Bookmark() {}

	public Bookmark(BookmarkUser bookmarkUser, Date created_at, boolean visible, String title, String description,
			String url) {
		this.bookmarkUser = bookmarkUser;
		this.created_at = created_at;
		this.visible = visible;
		this.title = title;
		this.description = description;
		this.url = url;
	}

	public BookmarkUser getBookmarkUser() {
		return bookmarkUser;
	}

	public void setBookmarkUser(BookmarkUser bookmarkUser) {
		this.bookmarkUser = bookmarkUser;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}		
}
